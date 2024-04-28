import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useAuth } from "../../auth/AuthProvider";
import { TextInput } from "react-native-paper";
import { Link, router } from 'expo-router';

export default function Home() {
  const { signOut, user } = useAuth();
  const handleSignOut = () => {
    router.push("/");
    signOut();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/driver.png')} 
        style={styles.topImage}
      />

      <View style={styles.textRow}>
        <Text style={styles.title}>Book Drivers</Text>
        <Text style={styles.title}>Near Me!</Text>
        <Text style={styles.text}>First Select Your Car Type!</Text>
      </View>

      <View style={styles.boxContainer}>
        {/* Matic */}
        <TouchableOpacity onPress={() => console.log('Maticpressed')}>
          <Link href="/Booking">
            <View style={styles.box}>
              <Image
                source={require('../../assets/matic.png')} // Replace with your image source
                style={styles.boxImage}
              />
              <Text style={styles.boxText}>Matic</Text>
            </View>
          </Link>
        </TouchableOpacity>

        {/* Manual */}
        <TouchableOpacity onPress={() => console.log('Manual pressed')}>
          <Link href="/Booking">
            <View style={styles.box}>
              <Image
                source={require('../../assets/manual.png')} // Replace with your image source
                style={styles.boxImage}
              />
              <Text style={styles.boxText}>Manual</Text>
            </View>
          </Link>
        </TouchableOpacity>
      </View>

      {/* Dashboard with buttons */}
      <View style={styles.dashboard}>
      <TouchableOpacity onPress={() => router.push("/Home")} style={styles.iconContainer}>
        <View style={styles.iconContent}>
          <TextInput.Icon icon="home" color="#836FFF" size={30} />
          <Text style={styles.iconTextChosen}>Home</Text>
        </View>
      </TouchableOpacity>
      <Link href="/Order/index" style={styles.iconContainer}>
        <View style={styles.iconContent}>
          <TextInput.Icon icon="book" color="#211951" size={30} />
          <Text style={styles.iconText}>Orders</Text>
        </View>
      </Link>
      <Link href="/Profile" style={styles.iconContainer}>
        <View style={styles.iconContent}>
          <TextInput.Icon icon="account" color="#211951" size={30} />
          <Text style={styles.iconText}>Profile</Text>
        </View>
      </Link>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  topImage: {
    width: '60%',
    height: '30%',
    resizeMode: 'cover',
    marginBottom:20,
  },
  textRow: {
    width: '100%',
    padding: 5,
    alignItems: 'center',
  },
  title:{
    fontSize: 28,
    fontFamily: 'MontserratExtraBold',
    color: '#836FFF',
  },
  text: {
    marginTop: 25,
    marginBottom:8,
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    color: "#211951",
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  box: {
    alignItems: 'center',
    backgroundColor: '#F0F3FF', 
    padding: 20,
    borderRadius: 10,
    elevation: 100, 
    borderWidth: 1, 
    borderColor: '#211951',
  },
  boxImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  boxText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily:'MontserratSemiBold',
    color: '#211951',
  },
  dashboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#F0F3FF',
    position: 'absolute',
    bottom: 0,
    height: '10%',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop:4,
  },
  iconContent:{
    alignItems: 'center',
  },
  iconText: {
    marginTop: 25,
    textAlign: 'center',
    fontSize: 8,
    fontFamily:'MontserratBold',
    color: '#211951',
  },
  iconTextChosen: {
    marginTop: 25,
    textAlign: 'center',
    fontSize: 8,
    fontFamily:'MontserratBold',
    color: '#836FFF',
  },
});
