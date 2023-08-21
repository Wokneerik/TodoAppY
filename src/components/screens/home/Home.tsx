import React, {FC} from 'react';
import Layout from '../../layout/Layout';
import LogoutButton from '../../ui/Logout';
import ListItem from './ListItem';
// import Accounts from './accounts/Accounts'
// import ApplyNewProduct from './apply-new-product/ApplyNewProduct';

const Home: FC = () => {
  return (
    <Layout>
      <ListItem />
      <LogoutButton />
    </Layout>
  );
};

export default Home;
