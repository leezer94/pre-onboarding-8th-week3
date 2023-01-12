import Spinner from 'components/@commons/Spinner/index.style';

const LoadingSpinner = ({ size = '50px', speed = '1s' }) => {
  return <Spinner size={size} speed={speed} />;
};

export default LoadingSpinner;
