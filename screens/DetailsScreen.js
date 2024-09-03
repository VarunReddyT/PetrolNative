import React from 'react';
import { FlatList, View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function DetailsScreen(){

  const [Response, setResponse] = useState([]);
  useEffect(() => {
    axios.get('https://petrol-backend.vercel.app/records')
      .then(response => {
        setResponse(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDelete = (key) => {
    axios.delete(`https://petrol-backend.vercel.app/records/${key}`)
      .then(response => {
        axios.get('https://petrol-backend.vercel.app/records')
          .then(response => {
            setResponse(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  
  const data = Array.from({ length: Response.length }, (_, index) => ({ key: String(index), item: Response[index] }));
  console.log(Response.length);

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Reading</Text>
        <Text style={styles.headerText}>Price</Text>
        <Text style={styles.headerText}>Date</Text>
        <Text style={styles.headerText}>Delete</Text>
      </View>
    );
  }
  const renderItem = ({ item }) => {
    const datePart = item.item.date.substring(0, 10);
    return (
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.tableText}>{item.item.reading}</Text>
        </View>
        <View/>
        <View style={styles.cell}>
          <Text style={styles.tableText}>{item.item.price}</Text>
        </View>
        <View/>
        <View style={styles.cell}>
          <Text style={styles.tableText}>{datePart}</Text>
        </View>
        <View/>
        <View style={styles.cell}>
        <TouchableOpacity style={styles.buttonDelete} onPress={() => handleDelete(item.item._id)}>
            <Text style={{color:'white'}}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
        

  return (
    <View>
    {renderHeader()}
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.key}
      ItemSeparatorComponent={() => <View/>}
      pagingEnabled={true} 
    />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  tableText:{
    fontSize: 16,
  },
  buttonDelete: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft : 10,
  }
});

