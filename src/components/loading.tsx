import Image from 'next/image';

interface LoadingProps {
  size: number;
}

const Loading = ({ size }: LoadingProps) => {
  return <Image alt="loading" src="/loading.svg" width={size} height={size} />;
};

export default Loading;
