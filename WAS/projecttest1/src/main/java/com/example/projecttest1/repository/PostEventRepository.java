package com.example.projecttest1.repository;

import com.example.projecttest1.entity.UserKey;
import com.example.projecttest1.entity.PostEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
public class PostEventRepository {
    @Autowired
    private UserKeyRepository userKeyRepository;
    @PersistenceContext
    private EntityManager em;

    public void savePostEvent(String hashKey, List<Long> artWorkIdList){
        try{
            UserKey userKey = userKeyRepository.findKey(hashKey);
            for(Long artWorkId : artWorkIdList){
                PostEvent postEvent = new PostEvent();
                postEvent.setArtWorkId(artWorkId);
                postEvent.setUserKey(userKey);
                em.persist(postEvent);
            }
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    public void modifyPostEvent(String hashKey, Long srcWorkId, Long destWorkId){
        try{
            UserKey userKey = userKeyRepository.findKey(hashKey);
            PostEvent postEvent = (PostEvent) em.createQuery("select p from PostEvent p where p.artWorkId = :artWorkId").setParameter("artWorkId", srcWorkId).getSingleResult();
            postEvent.setArtWorkId(destWorkId);
            em.merge(postEvent);
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }
}
