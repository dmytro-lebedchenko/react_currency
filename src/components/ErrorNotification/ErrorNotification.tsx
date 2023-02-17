import './ErrorNotification.scss';

type Props = {
  error: string,
};

export const ErrorNotification: React.FC<Props> = ({ error }) => (
  <h1
    className="error-notification"
  >
    {`...${error}...`}
  </h1>
);
