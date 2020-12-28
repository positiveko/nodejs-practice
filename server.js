const http = require('http');
const express = require('express');
let { posts } = require('./db'); // 서버를 킬 때마다 일시적으로 생성되는 데이터 입니다.
const app = express();

app.use(express.json());

app.get('/posts', (req, res) => {
  res.json({ posts }); // 모든 post 의 정보를 json 에 담아서 보내는 API
});

app.post('/posts', (req, res) => {
  const { username, title, description } = req.body;
  const newPost = { id: posts.length + 1, username, title, description };
  posts = [...posts, newPost];
  // posts = [...posts, req.body]; 바디에서 나온 걸 그대로 넣기보다는 한번 검증하는 절차가 필요. 
  // push를 하게 되면 원본 배열을 수정함. 불변성을 해치기 때문에 잘 사용하지 않음
  // 새롭게 배열을 복사해온 다음에 추가되는 아이템만 넣어주면 됨
const { username, title, description } = req.body
  res.status(201).json({ posts });
  // request 의 body 로 들어오는 post 의 데이터를 posts 배열에 추가 하는 함수
});

app.get('/posts/:id', (req, res) => {
  const { id } = req.params; // 구조분해할당 가능. 이렇게 꺼내오고서 기본 타입이 스트링이기 때문에 숫자로 바꿔줌
  // 반드시 형변환을 해서 엄격한 비교를 해주는 게 더 좋음
  res.status(200).json({ post: posts.find((post) => post.id === Number(id)) });
  // post id 로 조회하는 함수
});

app.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const {username, title, description} = req.body;
  let newPost;
  posts = posts.map((post) => {
    if (post.id !== Number(id)) return post;
    newPost = { ...post, username, title, description };
    return newPost;
  });
  res.status(201).json({ posts });
  // post id 로 posts 배열중 하나의 post를 업데이트 하는 함수
});

app.delete('/posts/:id', (req, res) => {
  // post id 로 posts 배열중 하나의 post를 삭제하는 함수

  const { id } = req.params;
  posts = posts.filter((post) => {
    if (post.id !== Number(id)) return true;
    return false;
  });
  res.status(201).json({ posts });
});

const server = http.createServer(app);

server.listen(8000, () => {
  console.log('server is listening on PORT 8000');
  console.log('lets fall in love with coding..💋');
});
