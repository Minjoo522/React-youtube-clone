import { formatDistanceToNowStrict } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function formatDate(dateString) {
  const date = new Date(dateString);
  const now = Date.now();
  // 현재 시간과의 차이(초) 구하기
  const diff = (now - date.getTime()) / 1000;

  if (diff < 60) {
    return '방금 전';
  }
  return formatDistanceToNowStrict(date, { addSuffix: true, locale: ko });
}
