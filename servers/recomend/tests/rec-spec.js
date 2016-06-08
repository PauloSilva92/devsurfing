const controller = require('../controllers/recomend-controller');


function recTagSpec(){
  const id = '5733e60aec9968781cfd9be0';

  controller.recTags(id, (data)=>{
    console.log(data);
  })
}

function trendingSpec(){
    const id = '5733e60aec9968781cfd9be0';
    controller.trending(id,(data)=>{
        console.log(data);
    });
}

// recTagSpec();
trendingSpec();
