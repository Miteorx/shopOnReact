import React from 'react';
import PageAccessValidator from 'components/PageAccessValidator';
import ShopPage from 'pages/Shop';
import PageContainer from 'components/PageContainer';

const Shop = () => (
    <PageAccessValidator>
      <PageContainer>
        <ShopPage/>
      </PageContainer>
    </PageAccessValidator>
);

export default Shop;
