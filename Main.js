import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, Linking, Image, FlatList, TextInput } from 'react-native';
import { Constants } from 'expo';

const savedHeadlines = ["Latest", "Business", "Science", "Canada", "(Add New)", "Quick Search"];

const topics =["World", "Nation", "Business", "Technology", "Entertainment", "Sports", "Science", "Health"];

class NewsItem extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {Linking.openURL(this.props.link)}}
        style={styles.newsItem}
      >
        <Text>{this.props.headline}</Text>
      </TouchableOpacity>
    )
  }
}

class HeadingsView extends React.Component {
  render() {
    return(
      <View style={styles.headingsContainer}>
        <FlatList style={styles.headingsList} horizontal='true' 
          data={savedHeadlines}
          renderItem={({item}) => this.props.renderItem(item)}
          extraData={this.props.extraData} 
        />
      </View>
    )
  }
}

class HeadingsTab extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {this.props.onPress(this.props.name)}}
        style={[styles.headingsTab, this.props.style]}
      >
        <Text>{this.props.name}</Text>
      </TouchableOpacity>
    )
  }
}

class GearButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => {this.props.onPress();}}>
        <Image source={require('./gearIcon.jpg')} style={styles.gearButton}/>
      </TouchableOpacity>
    )
  }
}

export default class App extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Major Headlines',
    headerRight: <GearButton onPress={() => navigation.navigate('Settings')}/>
  });

  state = {isLoading: true, currentHeading:"Latest", data:[], text:"Insert Topic"};

  findMatches(string) {
    let regex = /<item>.*?item>/g;
    return string.match(regex);
  }

  getTitle(string) {
    let regex = /<title>.*?title>/g;
    let newstring = string.match(regex)[0];
    return newstring.replace(/(<title>)|(<\/title>)/g, "");
  }

  getLink(string) {
    let regex = /<link>.*?link>/g;
    let newstring = string.match(regex)[0];
    return newstring.replace(/(<link>)|(<\/link>)/g, "");
  }

  createHeadlines = (item) => {
    if((item == this.state.currentHeading && !this.state.searching) || (item == "Quick Search" && this.state.searching)){
      return(
        <HeadingsTab name={item} onPress={this.getDataFunction} style={{backgroundColor: '#ecf0f1'}} />
      );
    }
    else{
      return(
        <HeadingsTab name={item} onPress={this.getDataFunction} />
      );
    } 
  }

  getData(query, searching){
    this.setState({isLoading:true, currentHeading:query || "Latest", searching:searching});
    var url = "https://news.google.com/rss/";
    if(query){
      if(query=="(Add New)" || query=="Quick Search"){
        this.setState({isLoading:false});
        return;
      }
      else if(topics.indexOf(query) !== -1){
        url = `https://news.google.com/news/rss/headlines/section/topic/${query.toUpperCase()}`;
      }
      else if(query!=="Latest"){
        url = `https://news.google.com/rss/search?q=<${query}>`;
      }
    }
    return fetch(url)
      .then((response) => response.text())
      .then((responseText) => this.findMatches(responseText))
      .then((matches) => this.setState({isLoading:false, data:matches}))
      .catch((error) => {
        console.error(error);
    })
  }

  getDataFunction = (query) => this.getData(query);

  onTextSubmit = (save) => {
    let text = this.state.text;
    if(save){
      if(savedHeadlines.indexOf(text) != -1){
        return;
      }
      savedHeadlines.splice(savedHeadlines.length-2, 0, text);
      this.getData(text);
    }
    else{
      this.getData(text, true);
    }
  }

  componentDidMount() {
    this.getData();
  }
  
  render() {
    if(this.state.isLoading){
      return (
        <View style={styles.container}>
          <HeadingsView extraData={[this.state.currentHeading, this.state.searching]} renderItem={this.createHeadlines}/>
          <View style={styles.listContainer}>
            <ActivityIndicator />
          </View>
        </View>
      )
    }
    if(this.state.currentHeading == "(Add New)" || this.state.currentHeading =="Quick Search"){
      return(
        <View style={styles.container}>
          <HeadingsView extraData={[this.state.currentHeading, this.state.searching]} renderItem={this.createHeadlines}/>
          <View style={styles.listContainer}>
              <TextInput
                style={styles.textInput}
                value={this.state.text}
                onChangeText={(text)=>this.setState({text:text})}
                onSubmitEditing={()=>{
                  if(this.state.currentHeading == "(Add New)"){
                    this.onTextSubmit(true)
                  }
                  else{
                    this.onTextSubmit()
                  }
                }}
              />
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <HeadingsView extraData={[this.state.currentHeading, this.state.searching]} renderItem={this.createHeadlines}/>
        <View style={styles.listContainer}>
          {this.state.searching &&
            <TextInput
                style={[styles.textInput, {margin:20}]}
                value={this.state.text}
                onChangeText={(text)=>this.setState({text:text})}
                onSubmitEditing={()=>{this.onTextSubmit()}}
              />
          }
          <FlatList style={styles.newsList} 
            data={this.state.data} 
            renderItem={({item}) => ( <NewsItem headline={this.getTitle(item)} link={this.getLink(item)}/> )} 
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  newsList: {
    backgroundColor: '#ecf0f1',
  },
  listContainer: {
     flex: .92,
  },
  headingsContainer:{
    flex: .08,
  },
  headingsList: {
    backgroundColor: '#d2d4d8',
  },
  headingsTab: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#808182',
    marginRight: 10,
  },
  gearButton: {
    height: 30,
    width: 30,
    resizeMode:"contain",
    margin: 8
  },
  newsItem: {
    padding: 10,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#5aa1e1',
    borderRadius: 20,
  },
  textInput: {
    fontSize: 20,
    margin: 30,
  },
});
