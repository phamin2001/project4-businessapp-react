import React from 'react';

const SearchContainer = (props) => {

    const businessesLists = props.searchBusinesses.businesses.map((business, i) => {
        return(
            <ui key = {i}>
                <section>
                    {business.location.display_address} <br/>
                </section>
            </ui>
        )
    })

    return(
        <div>
            <h2>Business Locations:</h2>
            {businessesLists}
        </div>
    )
}

export default SearchContainer;