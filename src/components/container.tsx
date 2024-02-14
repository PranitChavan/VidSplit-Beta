import { ContainerProps } from '@/types/types';

export default function Container(props: ContainerProps) {
  return <div className="container mt-10">{props.children}</div>;
}
