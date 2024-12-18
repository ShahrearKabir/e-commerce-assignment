PGDMP      ;                |            e_commerce_assignment_db    17.1    17.1     /           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            0           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            1           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            2           1262    16811    e_commerce_assignment_db    DATABASE     z   CREATE DATABASE e_commerce_assignment_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
 (   DROP DATABASE e_commerce_assignment_db;
                     postgres    false                        3079    16812 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                        false            3           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                             false    2            �            1259    16823    category    TABLE     �   CREATE TABLE public.category (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL
);
    DROP TABLE public.category;
       public         heap r       postgres    false    2            �            1259    16844    order    TABLE     �  CREATE TABLE public."order" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "customerName" character varying NOT NULL,
    "customerEmail" character varying NOT NULL,
    products json NOT NULL,
    "totalPrice" numeric NOT NULL,
    status character varying DEFAULT 'Pending'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public."order";
       public         heap r       postgres    false    2            �            1259    16831    product    TABLE       CREATE TABLE public.product (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    price numeric NOT NULL,
    "stockQuantity" integer NOT NULL,
    "categoryId" uuid
);
    DROP TABLE public.product;
       public         heap r       postgres    false    2            *          0    16823    category 
   TABLE DATA           9   COPY public.category (id, name, description) FROM stdin;
    public               postgres    false    218   X       ,          0    16844    order 
   TABLE DATA           �   COPY public."order" (id, "customerName", "customerEmail", products, "totalPrice", status, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    220   �       +          0    16831    product 
   TABLE DATA           ^   COPY public.product (id, name, description, price, "stockQuantity", "categoryId") FROM stdin;
    public               postgres    false    219   ?       �           2606    16854 $   order PK_1031171c13130102495201e3e20 
   CONSTRAINT     f   ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20";
       public                 postgres    false    220            �           2606    16830 '   category PK_9c4e4a89e3674fc9f382d733f03 
   CONSTRAINT     g   ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);
 S   ALTER TABLE ONLY public.category DROP CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03";
       public                 postgres    false    218            �           2606    16838 &   product PK_bebc9158e480b949565b4dc7a82 
   CONSTRAINT     f   ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.product DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82";
       public                 postgres    false    219            �           2606    16839 &   product FK_ff0c0301a95e517153df97f6812    FK CONSTRAINT     �   ALTER TABLE ONLY public.product
    ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES public.category(id);
 R   ALTER TABLE ONLY public.product DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812";
       public               postgres    false    3475    219    218            *   l   x�U�;
�0@�����d;�ܥ�$+�*H!�o�C����Q�ڇFP�9b��(P�/iM��^�]���&Ӱ]C�u%�ԚB���-E`F\H�?;Nw��o�C�+      ,   [  x�Œ;O$A��_q�����.!C"<.�'�X�cY���Nor�{lrH$-K%��UW
jK�`�i����ɈV�S.�����ݯa�9����f�w�÷����<��Y����&`a¾	"���@Y}T�N��Ǹݯ��i1?�D��yݖu{54d��ąp�0�>�#Ҩ6�cF`����@��P\G͜5��<|�.�g띰;"�Eb�U2$	���S�,�f��I?}��5(���l[/�G�T�iH	��
�[dl-8�~�"�6_�f}��Z�$'?ۀh�7���43�_���+[���)���=�֐Z'2o����;�C/���B���I����y�W���H      +      x���Kn1D�ݧ�����%`����r�8ji:ٵd�BB�Tյ�h�hHM���:4w+�����x�����6�sl)�UU/6G��i%L`�������w�l�Q WS�f�`��Z�I��>�Ab�U�L%�k ]��s��3uBm}�ݹ:D�P�E*SI�秿�� ������"���m�Y�����	�k���ə�d惔s�2^̔#�
�)+u�},cDU=I�7w��D���s�������(     