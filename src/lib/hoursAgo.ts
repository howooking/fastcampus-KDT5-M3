export default function hoursAgo(timeString: string): string {
  const currentTime: Date = new Date();
  const inputTime: Date = new Date(timeString);
  const timeDifference: number = currentTime.getTime() - inputTime.getTime();
  const minutesDifference: number = Math.floor(timeDifference / (1000 * 60));
  const hoursDifference: number = Math.floor(minutesDifference / 60);

  if (minutesDifference <= 0) {
    return '방금';
  }
  if (hoursDifference < 1) {
    return `${minutesDifference}분 전`;
  }
  return `약 ${hoursDifference}시간 전`;
}
