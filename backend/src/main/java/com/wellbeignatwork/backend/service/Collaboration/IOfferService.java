package com.wellbeignatwork.backend.service.Collaboration;


import com.wellbeignatwork.backend.entity.Collaboration.Offer;

import java.util.List;

public interface IOfferService {
    List<Offer> retrieveAllOffers();

    void addOffer(Offer o,long idCollaboration);

    void deleteOffer(Long id);

    Offer updateOffer(Offer o,Long idOffer);

    Offer retrieveOffer(Long id);

    List<Offer> listAll() ;
    
    float calculProm(long idOffer);


    Object getOfferWeather(Long idOffer);

    void inviteUsersToOffer(List<Long> usersId, Long offerId);
}
