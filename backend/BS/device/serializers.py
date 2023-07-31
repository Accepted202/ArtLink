import json

from rest_framework import serializers

from artwork import models
from device.models import Anchor
from gallery.models import Gallery


class AnchorSerializer(serializers.Serializer):
    anchorid = serializers.IntegerField()
    coorx = serializers.FloatField()
    coory = serializers.FloatField()
    gallery = serializers.IntegerField()

    def to_representation(self, instance):
        print(instance)
        data = {}
        attr = ['anchorid', 'coorx', 'coory', 'gallery']
        for att in attr:
            data[att] = getattr(instance, att)
        data['gallery'] = data['gallery'].galleryid
        return data


    def create(self, validated_data):
        gallery_id = validated_data.get('gallery')
        try:
            gallery = Gallery.objects.get(galleryid=gallery_id)
            validated_data['gallery'] = gallery
            print(validated_data)
            Anchor.objects.create(**validated_data)
        except Exception as e:
            print(e)
            raise serializers.ValidationError('Gallery does not exist')