/*
KESKEN VIELÄ

const router = require('express').Router();
// hakee kaikki suosikkilistat
router.get('/',
    function (request, response) {
        favoritelist.getAll(function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                response.json(dbResult);
            }
        })
    });
// hakee tietyn suosikkilistan
router.get('/:id',
    function (request, response) {
        favoritelist.getById(request.params.id, function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                response.json(dbResult);
            }
        })
    });
    //hakee profiilin suosikkilistoja
router.get('/profile/:profilename',
    function (request, response) {
        favoritelist.getById(request.params.profilename, function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                response.json(dbResult);
            }
        })
    });
//hakee ryhmän suosikkilistoja
    router.get('/group/:groupname',
    function (request, response) {
        favoritelist.getById(request.params.groupname, function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                response.json(dbResult);
            }
        })
    });

// lisää uuden suosikkilistan
router.post('/', 
function(request, response) {
  favoritelist.add(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(request.body);
    }
  });
});

// poistaa tietyn suosikkilistan
router.delete('/:id', 
function(request, response) {
  favoritelist.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

module.exports = router;*/