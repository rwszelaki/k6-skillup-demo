import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 30,
  duration: '10s',
};

export default function () {
  http.get('http://localhost:8080/get');
  sleep(1);

  const payload = JSON.stringify({
      id: 1,
      text: 'aaaaaaa',
    });

  const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  http.post('http://localhost:8080/post', payload, params)
  sleep(1);

  http.del('http://localhost:8080/delete/1')
  sleep(1);
}

