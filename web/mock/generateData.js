const loremIpsum = require("lorem-ipsum").loremIpsum;
const https = require("https");

function wait(timeToWait) {
  return new Promise(function(resolve) {
    setTimeout(resolve, timeToWait);
  });
}

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(body);
        } else {
          try {
            body = JSON.parse(body);
            resolve(body);
          } catch (error) {
            console.log("Parse error", body);
          }
        }
      });
      res.on("error", reject);
    });
  });
}

async function getImages(size, page = 1) {
  const url = `https://picsum.photos/v2/list?limit=${size}&page=${page}`;
  const images = await get(url);
  return images;
}

async function createImpacters(numberOfImpacters) {
  const impacters = [];
  const images = await getImages(numberOfImpacters);
  for (let index = 0; index < numberOfImpacters; index++) {
    impacters.push({
      id: index,
      name: loremIpsum({ count: 2, units: "word" }),
      bio: loremIpsum({ count: 10 }),
      profile_image: images[index].download_url,
    });
  }

  return impacters;
}

async function createPosts(impacters, numberOfPostsPerImpacter) {
  const result = [];
    let index_number = 0;
  for (let i = 0; i < impacters.length; i++) {
    const { id } = impacters[i];
      //index_number = index_number + 1;
    console.log(`Creating posts for impacter ${id}...`);
    const images = await getImages(numberOfPostsPerImpacter, i + 1);
    for (let index = 0; index < numberOfPostsPerImpacter; index++) {
      try {
        const { download_url, width, height, author } = images[index];
          index_number = index_number + 1;
          result.push({
              type: "IMAGES",
              id: index_number,
              description: loremIpsum({count: 10, units: "word"}),
              data: {
                  media: [
                      {
                          image: download_url,
                          width,
                          height,
                          version: "2019-03-14",
                          description: author
                      }
            ]
          },
          impacter_id: id
        });
      } catch (error) {
        console.log(error);
      }
    }
    await wait(200);
  }
  return result;
}

module.exports = {
  createImpacters,
  createPosts
};
