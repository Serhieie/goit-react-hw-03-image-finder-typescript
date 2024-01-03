import { Grid } from 'react-loader-spinner';

interface LoaderProps {
  height?: string | number;
  width?: string | number;
  color?: string;
  ariaLabel?: string;
  radius?: string | number;
  wrapperStyle?: React.CSSProperties;
  visible?: boolean;
}

export const Loader: React.FC<LoaderProps> = () => {
  return (
    <Grid
      height={60}
      width={60}
      color="#7dd3fc"
      ariaLabel="grid-loading"
      radius={12.5}
      wrapperStyle={{}}
      visible={true}
    />
  );
};
