import React, {Component} from 'react';
import { Text, View, ScrollView, FlatList, TouchableNativeFeedbackComponent} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
  return {
      campsites: state.campsites,
      comments: state.comments 
  };
};


function RenderComments({comments}) {

    const renderCommentItem = ({comments}) => {
        return (
            <View style= {{margin:10}}>
              <Text style ={{fontSize:14}}>{item.text}</Text>
              <Text style ={{fontSize:12}}>{item.rating} Stars</Text>
              <Text style ={{fontSize:12}}>{`--${item.author}, ${item.date}`}</Text>
            </View>
        );
    }
      return (
          <Card title='Comments'>
            <FlatList
               data = {comments}
               renderItem = {renderCommentItem}
               keyExtractor = {item => item.id.toString()}
             
             />

            
          </Card>
      );
}

function RenderCampsite(props) {

    const {campsites} = props;

    if (campsite) {
        return (
            <Card
                featuredTitle={campsite.name}
                image={require('./images/react-lake.jpg')}>
                <Text style={{margin: 10}}>
                    {campsite.description}
                </Text>
                <Icon
                    name={props.favorite ? 'heart-o' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised 
                    reverse
                    onPress={()=> props.favorite ? 
                          console.log('Already set as a favorite ') : props.markFavorite()}
                />
            </Card>
        );
    }
    return <View />;
}

class CampsiteInfo extends Component {

    constructor(props){
        super(props);
        this.state = { 
            favorite: false
        };
    }
markFavorite() {
    this.setState({favorite:true})
}

  static navigationOption = {
      title: 'Campsite Information'
  }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.props.campsites.campsites.filter(campsite =>campsite.id ===campsiteId)[0];
        const comments = this.props.comments.comments.filter(comments=>comments.campsite.id === campsiteID);
    return (
        <ScrollView>
              <RenderCampsite campsite= {campsite} 
                  favorite={this.state.filter}
                  markFavorite={()=>this.favorite()}
              />

              <RenderComments comments = {comments} /> 
         </ScrollView>
      );
    }
    
}

export default connect(mapStateToProps)(CampsiteInfo);

