import json

from rest_framework import serializers

from artwork.models import Artwork
from gallery.models import Gallery


class ArtworkSerializer(serializers.Serializer):
    artworkid = serializers.IntegerField()
    coorx = serializers.FloatField()
    coory = serializers.FloatField()
    gallery = serializers.IntegerField()

    def to_representation(self, instance):
        print(instance)
        data = {}
        attr = ['artworkid', 'coorx', 'coory', 'gallery']
        for att in attr:
            data[att] = getattr(instance, att)
        print(data)
        data['gallery'] = data['gallery'].galleryid
        return data


    def create(self, validated_data):
        gallery_id = validated_data.get('gallery')
        try:
            gallery = Gallery.objects.get(galleryid=gallery_id)
            validated_data['gallery'] = gallery
            print(validated_data)
            Artwork.objects.create(**validated_data)
        except Exception as e:
            print(e)
            raise serializers.ValidationError('Gallery does not exist')
    def update(self, validated_data):
        artwork_id = validated_data.get('artworkid')
        gallery_id = validated_data.get('gallery')
        try:
            artwork = Artwork.objects.get(artworkid=artwork_id)
            gallery = Gallery.objects.get(galleryid=gallery_id)
            validated_data['gallery'] = gallery
            print(validated_data)
            for key, value in validated_data.items():
                artwork.__setattr__(key, value)
            artwork.save()
        except Exception as e:
            print(e)
            raise serializers.ValidationError('Anchor does not exist')