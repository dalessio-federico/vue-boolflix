Vue.config.devtools = true;

var root = new Vue({

    el : "#root",

    data : {
        movieList : [],
        srcParams : ""
    },

    methods : {
        srcEvent : function()
                    {
                        axios
                        .get("https://api.themoviedb.org/3/search/movie",
                                {
                                    params: {
                                    api_key : "255bb4b57c925de984771ce579e8090f",
                                    query : this.srcParams,
                                    language : "it"
                                }
                            })
                        .then((r) =>
                            {
                                this.movieList = r.data.results;
                                console.log(this.movieList);
                            })
                    }
    }

})