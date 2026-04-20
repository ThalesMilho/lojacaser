/**
 *
 * EditProduct
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
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

const EditProduct = props => {
  const {
    user,
    product,
    productChange,
    formErrors,
    brands,
    updateProduct,
    deleteProduct,
    activateProduct
  } = props;

  const [variants, setVariants] = React.useState(product.variants || []);

  React.useEffect(() => {
    if (product.variants) {
      setVariants(product.variants);
    }
  }, [product.variants]);

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

    updateProduct();
  };

  return (
    <div className='edit-product'>
      <div className='d-flex flex-row mx-0 mb-3'>
        <label className='mr-1'>Product link </label>
        <Link to={`/product/${product.slug}`} className='default-link'>
          {product.slug}
        </Link>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Product Name'}
              value={product.name}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['sku']}
              label={'Sku'}
              name={'sku'}
              placeholder={'Product Sku'}
              value={product.sku}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12'>
            <Input
              type={'text'}
              error={formErrors['slug']}
              label={'Slug'}
              name={'slug'}
              placeholder={'Product Slug'}
              value={product.slug}
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
              value={product.description}
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
              value={product.quantity}
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
              value={product.price}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['taxable']}
              label={'Taxable'}
              multi={false}
              name={'taxable'}
              value={[product.taxable ? taxableSelect[0] : taxableSelect[1]]}
              options={taxableSelect}
              handleSelectChange={value => {
                productChange('taxable', value.value);
              }}
            />
          </Col>
          {user.role === ROLES.Admin && (
            <Col xs='12' md='12'>
              <SelectOption
                error={formErrors['brand']}
                label={'Select Brand'}
                multi={false}
                value={product.brand}
                options={brands}
                handleSelectChange={value => {
                  productChange('brand', value);
                }}
              />
            </Col>
          )}
          <Col xs='12' md='12' className='mt-3 mb-2'>
            <Switch
              id={`enable-product-${product._id}`}
              name={'isActive'}
              label={'Active?'}
              checked={product?.isActive}
              toggleCheckboxChange={value => {
                productChange('isActive', value);
                activateProduct(product._id, value);
              }}
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
        <div className='d-flex flex-column flex-md-row'>
          <Button
            type='submit'
            text='Save'
            className='mb-3 mb-md-0 mr-0 mr-md-3'
          />
          <Button
            variant='danger'
            text='Delete'
            onClick={() => deleteProduct(product._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
