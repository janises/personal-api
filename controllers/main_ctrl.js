var user = require('../user.js'),
    name = user.name,
    location = user.location,
    hobbies = user.hobbies,
    occupations = user.occupations,
    family = user.family,
    restaurants = user.restaurants,
    skills = require('../skills.js');


module.exports = {
    getName: (req, res) => {
        res.status(200).send({name: name})
    },
    getLocation: (req, res) => {
        res.status(200).send({location: location})
    },
    getOccupations: (req, res) => {
        if(req.query.order) {
            if(req.query.order === 'asc') {
                occupations = occupations.sort();
            } else if(req.query.order === 'desc') {
                occupations = occupations.sort().reverse();
            }
        }
        if(req.query.name) {
            occupations = occupations.filter(e=> {
                if(e.name.toLowerCase() === req.query.name.toLowerCase()) {
                    return e;
                }
            })
        }
        res.status(200).send({occupations: occupations})
    },
    getLatestOccupation: (req, res) => {
        res.status(200).send({latestOccupation: occupations[occupations.length-1]})
    },
    getHobbies: (req, res) => {
        if(req.query.name) {
            hobbies = hobbies.filter(hobby=> {
                if(hobby.name.toLowerCase() === req.query.name.toLowerCase()) {
                    return hobby;
                }
            })
        }
        res.status(200).send({hobbies: hobbies});
    },
    getHobbiesByType: (req, res) => {
        let hobbiesByType = hobbies.filter(hobby=> {
            if(hobby.type === req.params.type) {
                return hobby;
            }
        })
        res.status(200).send({hobbiesByType: hobbiesByType})
    },
    getFamily: (req, res) => {
        if(req.query.relation) {
            family = family.filter(e => {
                if(e.relation.toLowerCase() === req.query.relation.toLowerCase()) {
                    return e;
                }
            })
        }
        res.status(200).send({family: family})
    },
    getFamilyByGender: (req, res)=> {
        family = family.filter(e => {
            return e.gender === req.params.gender;
        })
        res.status(200).send({familyByGender: family})
    },
    getRestaurants: (req, res) => {
        res.status(200).send({restaurants: restaurants});
    },
    getRestaurantsByName: (req, res) => {
        restaurants = user.restaurants.filter(e => {
            return e.name.toLocaleLowerCase() === req.params.name.toLocaleLowerCase();
        })
        res.status(200).send({restaurants: restaurants});
    },
    changeName: (req, res)=> {
        name = req.body.name;
        res.status(200).send({name: name});
    },
    changeLocation: (req, res) => {
        location = req.body.location;
        res.status(200).send({location: location});
    },
    addHobbies: (req, res) => {
        hobbies = hobbies.concat(req.body.hobbies);
        res.status(200).send({hobbies: hobbies});
    },
    addOccupations: (req, res) => {
        occupations = occupations.concat(req.body.occupations);
        res.status(200).send({occupations: occupations});
    },
    addFamily: (req, res) => {
        family = family.concat(req.body.family);
        res.status(200).send({family: family});
    }, 
    addRestaurant: (req, res) => {
        restaurants = restaurants.concat(req.body.restaurants);
        res.status(200).send({restaurants: restaurants});
    },
    getSkills: (req, res) => {
        if(req.query.experience) {
            skills = skills.filter(e=> {
                if(e.experience.toLowerCase() === req.query.experience.toLowerCase()) {
                    return e;
                }
            })
        }
        if(req.query.name) {
            skills = skills.filter(e=> {
                if(e.name.toLowerCase() === req.query.name.toLowerCase()) {
                    return e;
                }
            })
        }
        res.status(200).send(skills);
    },
    addSkill: (req, res) => {
        let id = skills.length + 1;
        skills = skills.concat({id, name: req.body.name, experience: req.body.experience});
        res.status(200).send(skills);
    },
    updateFamily: (req, res) => {
        family = family.map(e => {
            if(e.relation.toLowerCase() === req.body.relation.toLowerCase()) {
                if(req.body.name) {
                    e.name = req.body.name;
                };
                if(req.body.gender) {
                    e.gender = req.body.gender;
                }
            }
            return e;
        })
       
        res.status(200).send(family);
    },
    updateRestaurant: (req, res) => {
        restaurants = restaurants.map(e => {
            if(e.name.toLowerCase() === req.body.name.toLowerCase()) {
                if(req.body.rating) {
                    e.rating = +req.body.rating;
                }
            }
            return e;
        })
        res.status(200).send(restaurants);
    }
}