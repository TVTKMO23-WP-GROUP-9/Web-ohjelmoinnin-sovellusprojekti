import React from 'react';


const Faq = () => {

    return (

        <div className="content">

            <h1>L9 - Leffaysi</h1>
            
                <h2 className='faq'>Yleistä</h2>
                <div className='justMargin'>
    
                    Leffaysi on Oulun ammattikorkeakoulun tietotekniikan opiskelijoiden tuotos toteutuksessa web-ohjelmoinnin sovellusprojekti (Q2/2024). 
                    Tarkoituksena oli tehdä leffaharrastajien sovellus, joka tarjoaa käyttäjälle yhteisöllisyyttä ja kokemuksia elokuvien ja sarjojen parissa.
                </div>

                <h2 className='faq'>Mistä nimi?</h2>
                <div className='justMargin'>
                
                    Nimeäminen on aina melko vaikea skene. Kun kaikki muut nimihirviöt oli makusteltu, sai leffa ja ryhmänumero yhdistyä. Siitä tuli Leffaysi. Tutummin L9.
                </div>

                <h2 className='faq'>Teknologiat</h2>
                <div className='justMargin'>
                    
                    Frontend on toteutettu Reactilla ja backend Node.js:llä. Tietokantana käytetään PostgreSQL:ää. <br/>
                    Sovellus on julkaistu ------ssa. <br/>
                    Muuta, mitä?
                </div>
    
                <h2 className='faq'>Muut otsikot</h2>
                <div className='justMargin'>
                    
                    Muut sisällöt
                </div>

        </div>

    );
};

export default Faq;
