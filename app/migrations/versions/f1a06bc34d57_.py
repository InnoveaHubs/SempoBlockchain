"""empty message

Revision ID: f1a06bc34d57
Revises: c4939759939e
Create Date: 2018-12-17 13:40:32.413166

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f1a06bc34d57'
down_revision = 'c4939759939e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('ap_bank_id', sa.String(), nullable=True))
    op.add_column('user', sa.Column('ap_paypal_id', sa.String(), nullable=True))
    op.add_column('user', sa.Column('ap_user_id', sa.String(), nullable=True))
    op.add_column('user', sa.Column('kyc_state', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('foo', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_column('user', 'kyc_state')
    op.drop_column('user', 'ap_user_id')
    op.drop_column('user', 'ap_paypal_id')
    op.drop_column('user', 'ap_bank_id')
    # ### end Alembic commands ###
