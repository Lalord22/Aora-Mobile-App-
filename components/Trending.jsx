import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';

const Trending = ({ posts }) => {
  
  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">
          {item.title}
        </Text>  
      )}
    />
  );
};

export default Trending;