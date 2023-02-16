import React from 'react';
import PageAccessValidator from 'components/PageAccessValidator';
import CreateCustomerPage from 'pages/CreateCustomer';
import PageContainer from 'components/PageContainer';

const Shop = () => (
    <PageAccessValidator>
      <PageContainer>
        <CreateCustomerPage/>
      </PageContainer>
    </PageAccessValidator>
);

export default Shop;
