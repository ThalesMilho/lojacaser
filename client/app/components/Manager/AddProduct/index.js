/**
 *
 * AddProduct
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import { ROLES } from '../../../constants';
import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';

const taxableSelect = [
  { value: 1, label: 'Yes' },
  { value: 0, label: 'No' }
];

const AddProduct = props => {
  const {
    user,
    productFormData,
    formErrors,
    productChange,
    addProduct,
    brands,
    image
  } = props;

  const [variants, setVariants] = React.useState([]);

  const addVariant = () => {
    setVariants([
      ...variants,
      { sku: '', size: '', color: '', stockQuantity: 0 }
    ]);
  };

  const removeVariant = index => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const handleVariantChange = (index, name, value) => {
    const newVariants = [...variants];
    newVariants[index][name] = value;
    setVariants(newVariants);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Agrupa as variantes no momento do submit
    productChange('variants', variants);
    
    // Extrai tamanhos e cores únicos para busca rápida
    const sizes = [...new Set(variants.map(v => v.size).filter(s => s))];
    const colors = [...new Set(variants.map(v => v.color).filter(c => c))];
    productChange('availableSizes', sizes);
    productChange('availableColors', colors);

    addProduct();
  };

  return (
    <div className='add-product'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['sku']}
              label={'Sku'}
              name={'sku'}
              placeholder={'Product Sku'}
              value={productFormData.sku}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Product Name'}
              value={productFormData.name}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={formErrors['description']}
              label={'Description'}
              name={'description'}
              placeholder={'Product Description'}
              value={productFormData.description}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'number'}
              error={formErrors['quantity']}
              label={'Quantity'}
              name={'quantity'}
              decimals={false}
              placeholder={'Product Quantity'}
              value={productFormData.quantity}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'number'}
              error={formErrors['price']}
              label={'Price'}
              name={'price'}
              min={1}
              placeholder={'Product Price'}
              value={productFormData.price}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['taxable']}
              label={'Taxable'}
              name={'taxable'}
              options={taxableSelect}
              value={productFormData.taxable}
              handleSelectChange={value => {
                productChange('taxable', value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <SelectOption
              disabled={user.role === ROLES.Merchant}
              error={formErrors['brand']}
              name={'brand'}
              label={'Select Brand'}
              value={
                user.role === ROLES.Merchant ? brands[1] : productFormData.brand
              }
              options={brands}
              handleSelectChange={value => {
                productChange('brand', value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'file'}
              error={formErrors['file']}
              name={'image'}
              label={'file'}
              placeholder={'Please Upload Image'}
              value={image}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'active-product'}
              name={'isActive'}
              label={'Active?'}
              checked={productFormData.isActive}
              toggleCheckboxChange={value => productChange('isActive', value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='variants-section mb-4'>
          <div className='d-flex align-items-center justify-content-between mb-3'>
            <h4 className='mb-0'>Product Variants</h4>
            <Button
              type='button'
              variant='outline-primary'
              text='Add Variant'
              onClick={addVariant}
            />
          </div>
          {variants.map((variant, index) => (
            <div key={index} className='variant-row border p-3 mb-3 rounded'>
              <Row>
                <Col xs='12' lg='3'>
                  <Input
                    type={'text'}
                    label={'Variant SKU'}
                    name={`sku-${index}`}
                    placeholder={'SKU'}
                    value={variant.sku}
                    onInputChange={(name, value) => handleVariantChange(index, 'sku', value)}
                  />
                </Col>
                <Col xs='12' lg='3'>
                  <Input
                    type={'text'}
                    label={'Size'}
                    name={`size-${index}`}
                    placeholder={'Size (e.g. M, L, XL)'}
                    value={variant.size}
                    onInputChange={(name, value) => handleVariantChange(index, 'size', value)}
                  />
                </Col>
                <Col xs='12' lg='3'>
                  <Input
                    type={'text'}
                    label={'Color'}
                    name={`color-${index}`}
                    placeholder={'Color'}
                    value={variant.color}
                    onInputChange={(name, value) => handleVariantChange(index, 'color', value)}
                  />
                </Col>
                <Col xs='12' lg='2'>
                  <Input
                    type={'number'}
                    label={'Stock'}
                    name={`stock-${index}`}
                    placeholder={'Stock'}
                    value={variant.stockQuantity}
                    onInputChange={(name, value) => handleVariantChange(index, 'stockQuantity', value)}
                  />
                </Col>
                <Col xs='12' lg='1' className='d-flex align-items-end mb-3'>
                  <Button
                    type='button'
                    variant='danger'
                    text='X'
                    onClick={() => removeVariant(index)}
                  />
                </Col>
              </Row>
            </div>
          ))}
        </div>
        <hr />
        <div className='add-product-actions'>
          <Button type='submit' text='Add Product' />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
