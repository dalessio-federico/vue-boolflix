Vue.config.devtools = true;

var root = new Vue({

    el : "#root",

    data : 
    {
        tvSeries : [],
        movieList : [],
        films : [],
        srcParams : "",
        avaibleLenguage : ["it", "en", "ja", "fr"]
    },

    methods : {
        srcEvent : function()
                    {   
                        this.movieList = [];
                        this.tvSeries = [];
                        this.films = [];
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
                                var tempMovies = r.data.results;
                                console.log(this.films)
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
                                        console.log("chiamata")
                                        this.tvSeries = ris.data.results;
                                        console.log(this.tvSeries);
                                        tempMovies = tempMovies.concat(this.tvSeries);
                                        tempMovies.forEach(e => 
                                            {   
                                                console.log("test");
                                                let tmp = e.vote_average
                                                e.vote_average = [];
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
                                        this.movieList = tempMovies;
                                        console.log("concat", this.movieList);
                                    })
                            })
                    },
        getFlag : function(flag) 
        {
            return `img/${flag}.png`
        },

        getPoster : function(poster)
        {
            return `https://image.tmdb.org/t/p/w342/${poster}`
        }
    }

})