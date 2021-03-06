import { AppProps } from 'next/app';
import Router from 'next/router';
import nProgress from 'nprogress';
import { QueryClient, QueryClientProvider, QueryOptions } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'prism-theme-night-owl';

import '@/styles/globals.css';
// import '@/styles/codeblock.css';
import '@/styles/code.css';
import '@/styles/nprogress.css';

import axiosClient from '@/lib/axios';

import DismissableToast from '@/components/DismissableToast';
import Layout from '@/components/layout/Layout';

const defaultQueryFn = async ({ queryKey }: QueryOptions) => {
  const { data } = await axiosClient.get(`${queryKey?.[0]}`);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

// EXPANSION CHANGES: 3 lines below
Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DismissableToast />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default MyApp;
