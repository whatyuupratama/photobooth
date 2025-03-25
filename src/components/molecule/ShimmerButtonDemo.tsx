import { ShimmerButton } from '@/components/magicui/shimmer-button';

export function ShimmerButtonDemo({ value }: { value: string }) {
  console.log(value);
  return <ShimmerButton className='p-4 bg-blue-500'>{value}</ShimmerButton>;
}
