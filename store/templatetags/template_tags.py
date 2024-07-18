# yourapp/templatetags/custom_tags.py

from django import template
from store.models import Product  # replace with your actual product model
from django.db.models import Count

register = template.Library()

@register.simple_tag(takes_context=True)
def append_query_params(context, **kwargs):
    request = context['request']
    updated = request.GET.copy()
    for key, value in kwargs.items():
        updated[key] = value
    return updated.urlencode()

@register.filter
def ret_feature_within_subcategories(category):
    return category.subcategories.filter(feature_within_category=True)[:5]

@register.filter
def get_subcategories_products(subcategory):
    return subcategory.sub_category.all()

@register.filter
def get_top_selling_from_category(category):
    return category.products.annotate(order_count=Count('cartorderitem')).order_by('-order_count')

@register.filter
def split_coma(instance):
    return instance.split(",")

@register.filter
def mini_get(instance):
    try:
        return instance[:5]
    except:
        return None

@register.filter
def past_mini_get(instance):
    try:
        return instance[5:]
    except:
        return None
    
@register.filter
def get(instance, num):
    return instance[:num]
    
@register.filter
def filter_ratings(instance, num):
    return instance.filter(rating=num)
    
@register.filter
def rating_percentage(product, num):
    return product.percentage_of_rating(num)
    
@register.filter
def round_num(num):
    return round(num, 1)