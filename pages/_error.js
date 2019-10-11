import Error from 'next/error';

function ErrorPage({ statusCode }) {
  return <Error statusCode={statusCode} />;
}

ErrorPage.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default ErrorPage;
