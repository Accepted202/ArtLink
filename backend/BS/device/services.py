import exhibition.services
from artwork.models import Voronoipoint, Voronoiresult
from device.models import Anchor
from helper.helper import *

def find_by_Id(id):
    return Anchor.objects.filter(anchorid = id).first()
def create_anchor_by_input(inputList):
    for Input in inputList:
        Anchor.objects.create(anchorid = Input.anchorid,
                              coorx = Input.coorx,
                              coory = Input.coory,
                              exhibition = exhibition.services.find_by_Id(Input.exhibitionId))
def create_output_by_anchorList(anchorList):
    stdout = []
    for anchor in anchorList:
        obj = {'anchorid': anchor.anchorid,
               'coorx': anchor.coorx,
               'coory': anchor.coory,
               'exhibitionId': anchor.exhibition.exhibitionid}
        stdout.append(obj)
    return stdout

def modify_anchor(anchorid, **kwargs):
    anchor = find_by_Id(anchorid)
    setattr(anchor, 'exhibition', exhibition.services.find_by_Id(kwargs['exhibitionId']))
    setattr(anchor, 'coorx', kwargs['coorx'])
    setattr(anchor, 'coory', kwargs['coory'])
    anchor.save()

def delete_anchor(anchorid):
    anchor = find_by_Id(anchorid)
    anchor.delete()

def get_coordination_by_input(deviceid, data):
    d1, d2, d3, id1, id2, id3 = data['d1'], data['d2'], data['d3'], data['anchor1'], data['anchor2'], data['anchor3']
    anchor1, anchor2, anchor3 = find_by_Id(id1), find_by_Id(id2), find_by_Id(id3)
    x1, y1, x2, y2, x3, y3 = anchor1.coorx, anchor1.coory, anchor2.coorx, anchor2.coory, anchor3.coorx, anchor3.coory

    exhibition = anchor1.exhibition
    return get_coord(d1, d2, d3, [x1, y1], [x2, y2], [x3, y3]), exhibition

def get_intersection_with_edge_by_exhibition(exhibition):
    return Voronoipoint.objects.filter(exhibition = exhibition), Voronoiresult.objects.filter(exhibition = exhibition)
