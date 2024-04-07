# Leffasovelluksemme käyttöliittymä React (vite)

### ThemeProvider
- Annetaan käyttäjälle mahdollisuus valita teema väliltä 'light' ja 'dark'
- Teeman tallennus istuntoon tms vielä rakenteilla, saa tehdä!

### index.html
- Määrittelee uloimman rungon, sieltä tulee mm. ulkopuoliset fontit sekä sivuston "ylätason" otsikko, icon yms.

### vite.config.js
- Aliakset ovat hyödyllisiä komponenttipoluissa, jolloin ei tarvitse viitata koko polkuun vaan voi oikoa polkua vastaavilla @aliaksilla. 

### main.jsx
- Aivan juuritason rakennemäärittelyä, lyhyesti App:in ympärillä ThemeProvider.

### App.jsx
- Reititykset, importit. Ikään kuin verisuonisto frontille. 
  - Router: ThemeProvider: .body : Error: Header: Routes [päänäkymät]: Footer ja sulkeutuu.

### css 
- Tyylejä on yleiskäyttöisiä.
- Samannimiset rakenteet riitelevät keskenään sujuvasti, eli joku yliajaa toisen. 
- Olisi ehkä hyvä sijoittaa kaikki tyylit css-kansion alle, toki hieman jaoteltuina jos mahdollista.
- styles.css: yleisilme, näitä käytetään kaikkialla ja näitä voi hyödyntää komponenteissa, 
  - esim. content-diviä kannattaakin sijoittaa päänäkymän alkuun ja sisälle rakentaa sitten komponentin maailma.
  - En suosittele kuitenkaan contentin käyttämistä "komponentin komponenteille", koska se vastaa ns. yleistä pohjaa päänäkymälle. 
- theme.css: pitää sisällään teemoihin sidonnaiset osat teemoille 'dark' ja 'light' sekä yhteiset molemmille. 
  - Suurin osa käytössä olevista komponeneteista hyödyntää näitäkin määrittelyjä ainakin osittain.
- emoji.css: tuo kivat unicode -emojit käyttöön noto-emoji-color -fontin säestämänä. Maltillinen käyttö suotavaa.
- media.css: rakennetaan tähän responsiivisuus, mikä on hyvällä alulla. 
  - Kaikki sellaiset säännöt pitää lajitella breakpointteihinsa, mitkä vaativat käsittelyä koon muuttuessa. 
  - Breakpointteja lisättävissä, muutettavissa tarpeen tullen.

### Responsiivisuus
- Pyritään huomioimaan mobiilikäyttäjät. Responsiivisuutta luotu yläpuolella mainitussa media.css -tiedostossa. Kesken, pitää sovitella komponentteja tehdessä. 

### components 
- Lajiteltu alakansioihin content , header ja footer
- headerissa otsikkotaso: headerissa myös mm. hamppari (vasen laita) sekä kirjautuminen (oikea laita)
- footerissa alapalkki
- contentissa kaikkien päänäkymien kansiot:
  - tässä vaiheessa jo:
  - community: vastaa yhteisö-sivun rakenteesta. Sisällytetty käyttäjälista, ryhmälista. 
    - **Puuttuu** mm. hakuominaisuudet, käyttäjätason ominaisuudet, selaamistoimintoja, arvostelut, linkityksiä ja vaikka mitä
  - error: lopullinen breakpoint noin alle 350px, mitä pienemmät näytöt saavat error-näkymän.
  - events: *selite puuttuu*
  - group: *selite puuttuu*
  - homepage: kotisivun tasolle tulee kaikkea vaihtuvaa, mm. lokaation mukaiset näytösajat, suositut leffat, tulevat Finnkinon leffat jne.
    - **Huom** sivupalkki rupeaa hajottamaan kokonaisuutta jo noin 1500px kohdalla ja siitä reilusti huonontaa näkymää noin 900px:stä eteenpäin. 
    - Ehdottaisin, että lokaation mukaiset seuraavat näytösajat olisivat sivunäkymällä esim. ylimpänä ja sivupalkeista luovuttaisiin;
      - jäävät hampparin ja kirjautumisen alle sekä luovat haastetta responsiiviseen näkymään. 
  - movies: elokuvahaku parametreilla. voidaan lisätä parametreja ja muuta hubia. 
    - **Puuttuu** mm. käyttäjätason toiminnot, lisäämiset suosikkeihin, ryhmiin, arvostelut, jotka kytköksissä leffaan jne. 
  - user: käyttäjätasolle tehty pohja "oma tili" -sivuun sekä "profiili" -sivuun. 
    - Myös community, ryhmät ja arvostelut (linkitys profiiliin) tulee hakemaan tiedot profiilin kautta sillä erolla, että:
    - jos käyttäjä on profiilin omistaja itse, hän voi muokata profiiliaan
    - jos profiili on asetettu yksityiseksi, muut eivät näe lisätietoja profiilista, kuin käyttäjä itse
    - käyttäjän ryhmät haetaan kannasta onnistuneesti profiiliin sekä käyttäjän nimi, profiilikuva ja kuvaus. 
    - **Puuttuu** mm. käyttäjän arvostelujen hakeminen, käyttäjän suosikit, kaikki Putit ja Deletet, oman tilin hallinnointi "oma tili" -kautta jutut mm. tilin poisto, muutokset perustietoihin, yksityisyys-täppä jne. aika lailla kaikki auki.
- Yleisesti puuttuu (*tässä voi olla toistoa yllä esitettyihin asioihin*): 
  - kaikenlaiset toiminnot, ominaisuudet mm. kirjautuneelle käyttäjälle
  - hallintatoiminnot, mm. tiliin, ryhmiin, suosikkeihin liittyen 
  - rekisteröityminen, salasanan palautus, tilikohtaiset muutokset
  - tietokantahaut monista paikoin, 
  - käyttäjätasoisest näkymät (visitor, user ja jopa admin jos tehdään?),  
  - sivunäkymiä ja komponentteja, esim. faq/about us -sivu/esittely, arvostelut, suosikit jne.

