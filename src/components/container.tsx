import { ContainerProps } from '@/types/types';

export default function Container(props: ContainerProps) {
  return <div className="container">{props.children}</div>;
}
