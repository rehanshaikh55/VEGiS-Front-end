import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import CustomHeader from '@components/ui/CustomHeader';
import {Colors} from '@utils/Constants';
import Sidebar from './Sidebar';
import {
  getAllCategories,
  getProductByCategories,
} from '@service/productService';
import ProductList from './ProductList';
import withCart from '@features/cart/WithCart';

const ProductCategories: FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [productLoading, setProductLoading] = useState<boolean>(false);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const data = await getAllCategories();
      setCategories(data);
      if (data && data.length > 0) {
        setSelectedCategory(data[0]);
      }
    } catch (error) {
      console.log('Fetching categories error', error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async (categoryId: string) => {
      try {
        setProductLoading(true);
        const data = await getProductByCategories(categoryId);
        setProducts(data);
      } catch (error) {
        console.log('Error Fetching Products', error);
      } finally {
        setProductLoading(false);
      }
    };
    if (selectedCategory?._id) {
      fetchProducts(selectedCategory?._id);
    }
  }, [selectedCategory]);

  return (
    <>
      <View style={styles.mainContainer}>
        <CustomHeader title={selectedCategory?.name || 'Category'} search />

        <View style={styles.subContainer}>
          {categoriesLoading ? (
            <ActivityIndicator size="small" color={Colors.border} />
          ) : (
            <Sidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryPress={(category: any) => setSelectedCategory(category)}
            />
          )}
          {categoriesLoading ? (
            <ActivityIndicator
              size="large"
              color={Colors.border}
              style={styles.center}
            />
          ) : (
            <ProductList data={products || []} />
          )}
        </View>
      </View>
    </>
  );
};

export default withCart( ProductCategories);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
