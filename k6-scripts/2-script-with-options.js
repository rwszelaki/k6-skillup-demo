import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 30,
  duration: '1m',
};

export default function () {
  http.get('http://localhost:8080/get');
  sleep(1);
}

