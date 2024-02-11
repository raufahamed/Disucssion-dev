const paths = {

    homePage(){
        return '/';
    },
    topicShow(topicSlug:string){

        return `/topics/${topicSlug}`;
    },
    createPost(topicSlug:string){
          return `/topics/${topicSlug}/posts/new`;  
    },
    showPost(topicSlug:string,postId:string){
           return `/topics/${topicSlug}/posts/${postId}`
    }
}

export default paths