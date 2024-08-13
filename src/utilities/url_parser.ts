type TUrlInfo = {
  domain: string;
  port: string;
  path: string;
  query_params: { [key: string]: string };
}

const url_parser = (host: string, url: string): TUrlInfo => {
  if (!url) return { domain: '', port: '', path: '', query_params: {} };

  const [domain = '', port = ''] = host.split(':');
  const [path = '', query = ''] = url.split('?');

  const query_params = query.split('&').reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    if (key && value) {
      acc[decodeURIComponent(key)] = decodeURIComponent(value);
    }
    return acc;
  }, {} as Record<string, string>);

  return {
    domain,
    port,
    path: path.startsWith('/') ? path : `/${path}`,
    query_params
  };
};

// Explanation:
// 1. We use default values in destructuring to handle cases where host or url might not have all parts.
// 2. We split the query string more safely, using an empty string as default if there's no query.
// 3. In the query_params reduction, we now check if both key and value exist before adding to the accumulator.
// 4. We use decodeURIComponent for both key and value to handle URL-encoded characters.
// 5. We explicitly type the accumulator as Record<string, string> for better type safety.
// 6. We ensure the path always starts with a '/' for consistency.
// These changes make the function more robust, handle edge cases better, and improve type safety.

export { url_parser, TUrlInfo };
