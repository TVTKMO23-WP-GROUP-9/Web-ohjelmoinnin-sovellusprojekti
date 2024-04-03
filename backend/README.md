
***HOX!***

- Backendin arkkitehtuuri on muuttumassa.
- Kun kaikki siirretty paikoilleen, niin kansio " routes " -poistetaan.

***Nyt jo siirrettyjä ja testattuja***

- routes/authRoutes.js -> auth/authRoutes.js | auth/authModel.js | auth/authService.js
- generate/generatePasswords.js -> auth/generatePasswords.js 
- routes/groupRoutes.js -> group/groutRoutes.js | group/groupService.js | group/groupModel.js 
  - testattu, mutta joku voinee vielä tarkistaa mm. post, put, delete?
- routes/movieRoutes.js -> movie/movieRoutes.js | movie/movieService.js
- routes/data/MovieData.js -> movie/movieModel.js

***Näitä ei ole vielä siirretty***

- routes/profileRoutes.js
- routes/messageRoutes.js
- muistettava siirrossa myös tehdä vipu server.js:ään

***Asiaa muutoksesta*** 

Separation into components -on modulaarinen ja helposti ylläpidettävä malli. 
Kun koodi on jaettu hallittaviin osiin, ylläpitäminen on helpompaa. Tällöin myös eri jäsenet tiimissä pääsevät työskentelemään eri osien parissa ilman päällekkäisyyksiä eikä kehittäjän ei tarvitse hyppiä paikasta toiseen työskennellessään.

***Logiikan rakenteellinen jakautuminen***

**Service** = tietokantakyselyt, businesslogiikka. 
**Route** = ottaa vastaan REST-polun, ja HTTP-pyynnöt, käsittelee requestin ja responsen.
**Model** = vastaa datan mallintamisesta ja tietokantakyselyista. Sisältää toiminnot, jotka liittyvät tietojen hakemiseen ja tallentamiseen tietokantaan.

***Havainnollistettuna *** 

movie /
movieService.js	
movieRoutes.js
movieModel.js

profile/
profileService.js
profileRoutes.js
profileModel.js

auth/
authService.js
authRoutes.js
authModel.js

group/
groupService.js
groupRoutes.js
groupModel.js

routes/ saisi deletee siirron jälkeen
