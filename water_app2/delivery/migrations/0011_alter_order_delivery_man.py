# Generated by Django 4.0.4 on 2022-05-25 15:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('delivery', '0010_remove_order_delivery_service_order_delivery_man'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='delivery_man',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='delivery_man', to='delivery.deliveryman'),
        ),
    ]
