const fastify = require("fastify")({ logger: false });
const fs = require("fs");
const path = require("path");
const pump = require("pump");
const uuidv4 = require("uuid").v4;
const { createImpacters, createPosts } = require("./generateData");

let impacters = [];
let posts = [];

async function createMockData() {
  try {
    impacters = await createImpacters(19);
    posts = await createPosts(impacters, 50);
    fs.writeFileSync(
        "./mock/data.json",
        JSON.stringify({
          impacters,
          posts
        })
    );
  } catch (error) {
    console.log("Failed to create data", error);
  }
}

async function loadMockData() {
  try {
    const data = await require("./data.json");
    impacters = data.impacters;
    posts = data.posts;
  } catch (error) {
    await createMockData();
  }
}

fastify.register(require("fastify-cors"), {
  origin: "*"
});

fastify.register(require("fastify-multipart"));
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "../uploads"),
  prefix: "/uploads/"
});

// Declare a route
fastify.get("/", async (request, reply) => {
  return "Ok";
});

fastify.get("/impacters", async (request, reply) => impacters);
fastify.get("/impacters/:id", async (request, reply) => {
  const id = request.params.id ? Number.parseInt(request.params.id) : -1;

  return impacters.find(impacter => impacter.id === id);
});

fastify.get("/impacters/:id/posts", async (request, reply) => {
  const id = request.params.id ? Number.parseInt(request.params.id) : -1;

  return posts.filter(post => post.impacter_id === id);
});

fastify.get("/posts", async (request, reply) => {
  const limit = request.query.limit
      ? Number.parseInt(request.query.limit)
      : posts.length;
  const offset = request.query.limit
      ? Number.parseInt(request.query.offset)
      : 0;

  return posts.slice(offset, offset + limit);
});

fastify.post("/posts", async (request, reply) => {
  const post = request.body;
  post.id = posts.length;
  posts.push(post);
  return post;
});

fastify.get("/posts/:id", async (request, reply) => {
  const id = request.params.id ? Number.parseInt(request.params.id) : -1;

  return posts.find(post => post.id === id);
});

fastify.put("/posts/:id", async (request, reply) => {
  const id = request.params.id ? Number.parseInt(request.params.id) : -1;
  const postIndex = posts.findIndex(post => post.id === id);
  const post = posts[postIndex];
  const updatedPost = {
    ...post,
    ...request.body
  };
  posts[postIndex] = updatedPost;
  return updatedPost;
});

fastify.delete("/posts/:id", async (request, reply) => {
  const id = request.params.id ? Number.parseInt(request.params.id) : -1;
  const postIndex = posts.findIndex(post => post.id === id);
  posts.splice(postIndex, 1);
  return postIndex;
});

fastify.post("/upload", async function(request, reply) {
  const folderPath = `./uploads/${uuidv4()}`;
  await fs.promises.mkdir(folderPath, { recursive: true });

  let filePath;
  const mp = request.multipart(handler, function(error) {
    if (error) {
      return reply.code(500).send(error);
    }
    console.log("upload completed");
    reply.code(200).send({
      url: `http://localhost:3001/${filePath.replace("./", "")}`
    });
  });

  mp.on("field", function(key, value) {
    console.log("form-data", key, value);
  });

  function handler(field, file, filename, encoding, mimetype) {
    filePath = `${folderPath}/${filename}`;
    pump(file, fs.createWriteStream(filePath));
  }
});

// Run the server!
const start = async () => {
  try {
    await loadMockData();
    await fastify.listen(3001);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();