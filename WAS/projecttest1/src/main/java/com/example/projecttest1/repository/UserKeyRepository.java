package com.example.projecttest1.repository;

import com.example.projecttest1.entity.UserKey;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Transactional
@Repository
public class UserKeyRepository {
    @PersistenceContext
    private EntityManager em;

    public Long countAllKeys(){
        System.out.println("Count Try");
        try{
            return em.createQuery("SELECT COUNT(k) FROM UserKey k", Long.class).getSingleResult();
        }
        catch(Exception e){
            System.out.println("Count Failed");
            return -1L;
        }
    }

    public void saveKey(String hashKey){
        try{
            UserKey userKey = new UserKey();
            userKey.setHashKey(hashKey);
            em.persist(userKey);
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    public UserKey findKey(String hashKey){
        try{
            return (UserKey) em.createQuery("SELECT k FROM UserKey k WHERE k.hashKey = :hashKey").setParameter("hashKey", hashKey).getSingleResult();
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }

    public Long findIdx(String hashkey){
        try{
            return (Long) em.createQuery("SELECT k.id FROM UserKey k WHERE k.hashKey = :hashKey").setParameter("hashKey", hashkey).getSingleResult();
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }
}
