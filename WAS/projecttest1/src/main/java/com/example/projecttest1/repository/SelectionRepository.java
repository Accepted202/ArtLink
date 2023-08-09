package com.example.projecttest1.repository;

import com.example.projecttest1.entity.Device;
import com.example.projecttest1.entity.Selection;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.*;

@Transactional
@Repository
public class SelectionRepository{

    @PersistenceContext
    private EntityManager em;

    public void save(Selection selection){
        em.persist(selection);
    }

    public void delete(Selection selection){
        em.remove(selection);
    }

    public List<Selection> getSelectionByDevice(Long deviceId){
        Device device = em.find(Device.class,deviceId);
        return em.createQuery("SELECT s FROM Selection s WHERE s.device = :device").setParameter("device",device).getResultList();
    }

    public void deleteRecentSelectionByDevice(Long deviceId){
        try{
            List<Selection> selectedList = new ArrayList<>();
            Device device = em.find(Device.class,deviceId);
            selectedList = em.createQuery("SELECT s FROM Selection s WHERE s.device = :device ORDER BY s.timeStamp" ).setParameter("device",device).getResultList();
            for(Selection selection:selectedList){
                System.out.println(selection.getTimeStamp());
            }
            em.remove(selectedList.get(0));
        }
        catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }

}
