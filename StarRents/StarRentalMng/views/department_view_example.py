from starlette_admin import BaseModelView, IntegerField, StringField
from typing import List, Any, Optional, Dict, Sequence, Union
from starlette.requests import Request

class DepartmentView(BaseModelView):
    # Basic Config
    identity = "department" # URL
    name = "Department" # Singular name
    label = "Departments" # Plural Name
    icon = "fa fa-building" # FontAwesome icon
    pk_attr = "department_code" 

    # Form behaviour
    form_include_pk = True # If user must enter the PK value manually

    column_searchable_list = ["department_code", "department_name"]
    sortable_field = ["department_name", "department_code"]

    # Field definition

    fields = [
        IntegerField(
            name="department_code",
            label="Department Code",
            required=True,
        ),
        StringField(
            name="department_name",
            label="Department Name",
            required=True,
        ),
    ]

    async def serialize(self, *args, **kwargs) -> dict:
        # Convert database row to dictionary for the Admin interface
        if args:
            obj = args[0]
        else:
            obj = kwargs.get("obj") or kwargs.get("instance")
        
        