import {Box, List, ListItem} from "@material-ui/core";
import React from "react";
import { feedFunctions } from "../../firebase";
import UserPost from "./UserPost"


class PostList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            feed:[]

        }
    }

    componentDidMount(){
        if(this.props.type ==="feed"){
            setInterval(()=>{
                this.setState({feed:[]},()=>feedFunctions.fetchFeed(this))
            }, 
            1000
            )
            
        }
        else{
            var userData = this.state.feed.values;
            if(userData.posts != null){
                var profilePosts = Object.keys(userData.posts).map((key)=>{
                    var post ={info:userData.posts[key], profile_pic:userData.profile_pic, name:userData.name}
                    return post
                })
                this.setState({feed:profilePosts});
            }
        }
    }

    render(){
        return(
            <Box display='flex' justifyContent='center'>
                <List>
                        {this.state.feed.map(post=>{
                            return <ListItem key={post.postText+' '+post.postImage}>
                                <UserPost username={`${post.name.first} ${post.name.last}`}
                                userAvatar={post.profile_pic}
                                postDate={new Date(post.info.timestamp).toString()}
                                postText={post.info.text}/>
                            </ListItem>
                        })}
                </List>
            </Box>

        );

    }
}
export default PostList;