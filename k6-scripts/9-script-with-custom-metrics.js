import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { Trend } from 'k6/metrics';

export const options = {
  vus: 30,
  duration: '10s',
  thresholds: {
      // Nie więcej niż 1% requestów może zwrócić błąd
      http_req_failed: [
            {
              threshold: 'rate<0.01',
              abortOnFail: true,
              delayAbortEval: '10s',
            },
      ],
      // 90% requestów musi zakończyć się w 200ms itd.
      http_req_duration: ['p(90) < 200', 'p(95) < 300', 'p(99.9) < 500'],
    },
};

const getHttpDuration = new Trend('get_duration');
const postHttpDuration = new Trend('post_duration');

export default function () {
  const getResponse = http.get('http://localhost:8080/get');
  getHttpDuration.add(getResponse.timings.duration);
  check(getResponse, {
      'is status 200': (r) => r.status === 200,
      'verify returned text': (r) =>
            r.body.includes('Request completed successfully'),
    });
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
  const postResponse = http.post('http://localhost:8080/post', payload, params)
  postHttpDuration.add(postResponse.timings.duration);
  check(postResponse, {
      'is status 200': (r) => r.status === 200,
    });
  sleep(1);
}

