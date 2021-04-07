Vue.config.devtools = true;

var root = new Vue({

    el : "#root",

    data : {
        films: [],
        tvSeries : [],
        movieList : [],
        srcParams : "",
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
                                this.films= r.data.results;
                                // this.movieList = this.movieList.concat(this.films)
                                console.log(this.movieList)
                                this.movieList.forEach(e => 
                                {   
                                    let tmp = e.vote_average
                                    e.vote_average = []
                                    votes = Math.ceil(tmp/2);
                                    for(let i=0; i<5; i++)
                                    {
                                        if(i < votes)
                                        {
                                            e.vote_average.push("fas fa-star")
                                        }
                                        else
                                        {
                                            e.vote_average.push("far fa-star")
                                        }
                                        
                                    }
                                });
                            })
                        
                        axios
                        .get("https://api.themoviedb.org/3/search/tv",
                                {
                                    params: {
                                    api_key : "255bb4b57c925de984771ce579e8090f",
                                    query : this.srcParams,
                                    language : "it"
                                }
                            })
                        .then((ris)=>
                        {
                            this.tvSeries = ris.data.results
                            
                        })
                        this.movieList = this.movieList.concat(this.tvSeries, this.films)
                        console.log(this.movieList)
                        // this.movieList = [];
                    }
    }

})