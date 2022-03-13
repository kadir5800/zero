#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
import math


# In[2]:


def tablo_sil():
    for i in frame_cvpmtrx.winfo_children():
        i.destroy()
    for i in frame_altL.winfo_children():
        if i!=anamenu:
            i.destroy()
    for i in frame_mtrx.winfo_children():
        i.destroy()
    return 


# In[3]:


def tablo_cevir():
    if ops==1 :
        boy2=100/x2
        boy2=boy2/100
        boy1=100/x1
        boy1=boy1/100
        globals()["sütunM"]=Label(frame_altL,text="Maliyet Sütunları",font=("Courier", 10))
        sütunM.place(relx=0.02,rely=0.22)    
        globals()["label1"]=Label(frame_altL,text="(aralarına ',' koyarak yazın)",font=("Courier", 8))
        label1.place(relx=0.01,rely=0.25)
        globals()["label2"]=Label(frame_altL,text="Örnegin 1,3,5",font=("Courier", 8))
        label2.place(relx=0.01,rely=0.29)
        globals()['maliyet']=Entry(frame_altL)
        maliyet.place(relx=0.55,rely=0.29,relheight=0.05,relwidth=0.4)
        if menu_ckkv==False:
            globals()['selected_radio']=tk.StringVar()
            globals()['crit_r'] = Radiobutton(frame_altL, text='Crit-method', value="crit", variable=selected_radio)
            crit_r.place(relx=0.02,rely=0.35)
            globals()['entropi_r'] = Radiobutton(frame_altL, text='Entropi', value="entropi", variable=selected_radio)
            entropi_r.place(relx=0.02,rely=0.4)
#####################################################################################
        if menu_ckkv==True:
            globals()['selected_radio']=tk.StringVar()
            globals()['selected_radio2']=tk.StringVar()
            if crit_on==True:
                globals()['crit_rb2'] = Radiobutton(frame_altL, text='crit', value="a_crit", variable=selected_radio2)
                crit_rb2.place(relx=0.42,rely=0.4)
            globals()['topsis'] = Radiobutton(frame_altL, text='Topsis-method', value="topsis", variable=selected_radio)
            topsis.place(relx=0.02,rely=0.35)
            globals()['bos_r'] = Radiobutton(frame_altL, text='--bos--', value="2", variable=selected_radio)
            bos_r.place(relx=0.02,rely=0.4)
            for j in range(0,x2):
                globals()['1_lbl%s' % j]=Label(frame_cvpmtrx,text="w%s"%(j+1),font=("Courier", 8))
                globals()['1_lbl%s' % j].place(relx=0.01+(boy2*j),rely=0.19,relwidth=(boy2/1.2))
                globals()['top_w%s' % j] = Entry(frame_cvpmtrx)
                globals()['top_w%s' % j].place(relx=0.01+(boy2*j),rely=0.4,relwidth=(boy2/1.2))
  #####################################################################################      
    result=table_text.get("1.0", "end-1c")
    result = result.replace("\n",'	')
    result = result.split('	')
    n=0
    globals()['m_tree'] =Treeview(frame_mtrx, selectmode="extended")
    m_tree.place(relx=0,rely=0,relheight=1,relwidth=1)
    verscrlbar_y = Scrollbar(m_tree,
                        orient ="vertical",
                        command = m_tree.yview)
    verscrlbar_x = Scrollbar(m_tree,
                        orient ="horizontal",
                        command = m_tree.xview)
    m_tree.configure(yscrollcommand = verscrlbar_y.set,xscrollcommand=verscrlbar_x.set)
    verscrlbar_x.pack(side ='bottom', fill ='x')
    verscrlbar_y.pack(side ='right', fill ='y')
    table_list=[]
    column_df=[]
    for i in range(x2):
        column_df.append("x{}".format(i))
    while n<(x1*x2):
        value = result[n].replace(",",'.')
        table_list.append(float(value))
        n=n+1
    table_df=np.array(table_list)
    table_df=table_df.reshape(x1, x2)
    table_df=pd.DataFrame(table_df)
    globals()["global_df"]=table_df
    m_tree['columns'] = column_df
    
    m_tree.column("#0", width=0, stretch="no")
    for i in range(x2):
        m_tree.column("x{}".format(i), anchor="w", width=80)
        
    m_tree.heading("#0", text="", anchor="w")
    for i in range(x2):   
        m_tree.heading("x{}".format(i), text="x{}".format(i+1), anchor="w")
        
    list_df=[]
    for i in range(x1):
        for j in range(x2):
            list_df.append(table_df.iloc[i,j])
        m_tree.insert('', tk.END,values=list_df)
        list_df=[]
    return


# In[4]:


def hesapla2():
    print(global_df)
    maliyetler=[]
    if selected_radio.get()=="crit" and maliyet.get()!="":
        maliyetler=maliyet.get()
        maliyetler=maliyetler.split(",")
    maliyetler2=[]
    upps=0
    if selected_radio.get()=="crit" and maliyet.get()!="":
        for i in range(0,len(maliyetler)):
            if int(maliyetler[i])>x2:
                upps=1
        if upps==1:
                messagebox.showwarning("showwarning", "maliyetler stünunu yanlış girdiniz")
        if upps==0:
            for i in range(0,len(maliyetler)):
                maliyetler2.append(int(maliyetler[i])-1)
    if upps==0 and selected_radio.get()=="crit":
        boy2=100/x2
        boy2=boy2/100
        boy1=100/x1
        boy1=boy1/100
        globals()["sütunCrit"]=Label(frame_cvpmtrx,text="Sütun Krit değerleri",font=("Courier", 8))
        sütunCrit.place(relx=0.2,rely=0.01)
        for j in range(0,x2):
            globals()['1lbl%s' % j]=Label(frame_cvpmtrx,text="x%s"%(j+1),font=("Courier", 8))
            globals()['1lbl%s' % j].place(relx=0.01+(boy2*j),rely=0.19,relwidth=(boy2/1.2))
            globals()['k%s' % j] = Entry(frame_cvpmtrx)
            globals()['k%s' % j].place(relx=0.01+(boy2*j),rely=0.4,relwidth=(boy2/1.2))
        degerler=[]
        maliyetler.clear()
        bolean=0
        for b in range(0,x1):
            for a in range(0,x2):
                for j in range(0,len(maliyetler2)):
                    if maliyet.get()!="" and int(maliyetler2[j])==a:
                        deger=(global_df.iloc[0:x1,a].max(axis=0)-global_df.iloc[b,a])/(global_df.iloc[0:x1,a].max(axis=0)-global_df.iloc[0:x1,a].min(axis=0))
                        degerler.append(deger)
                        bolean=1
                if bolean==0:
                    deger=(global_df.iloc[b,a]-global_df.iloc[0:x1,a].min(axis=0))/((global_df.iloc[0:x1,a].max(axis=0))-global_df.iloc[0:x1,a].min(axis=0))
                    degerler.append(deger)
                bolean=0 
        maliyetler2.clear()
        degerler=np.reshape(degerler,(x1,x2))
        normaldf=pd.DataFrame(degerler)
        print(normaldf)
        cordf=normaldf.corr(method='pearson')
        print(cordf)
        cordf.iloc[:]=1-cordf.iloc[:].values
        listem=[]
        print(cordf)
        print(normaldf.std())
        for j in range(0,x2):
            cj=cordf[j].sum()*normaldf[j].std()
            listem.append(cj)
        print(listem)
        globals()["crit_on"]=True
        globals()["wj"]=[]         
        for j in range(0,x2):
            wj.append(listem[j]/sum(listem))
            globals()['k%s' % j].insert(0,listem[j]/sum(listem))
        print(wj)
    if selected_radio.get()=="topsis":
        df = global_df
        kök2_df=df.iloc[:,:]*df.iloc[:,:]
        print(kök2_df)
        step1_df=[]
        topsis_wj=[]
        result=0
        for j in range(x1):
            for i in range(x2):
                toplam=kök2_df.iloc[:,i].sum()
                result=df.iloc[j,i]/math.sqrt(toplam)
                if selected_radio2.get() =="a_crit":
                    step1_df.append(result*(wj[i]))
                else:
                    for i in range(x2):
                        topsis_wj.append(globals()['top_w%s' % j].get())
                    step1_df.append(result*float(topsis_wj[i]))
        step1_df=np.array(step1_df)
        step1_df=np.reshape(step1_df,(x1,x2))
        step1_df=pd.DataFrame(step1_df)
        print(step1_df)
        v_poz=[]
        v_neg=[]
        kontrol=0
        for i in range(x2):
            for j in range(len(maliyetler2)):
                if int(maliyetler2[j])==i:
                    v_poz.append(step1_df.iloc[:,i].min())
                    v_neg.append(step1_df.iloc[:,i].max())
                    kontrol=1
            if kontrol==0:
                v_poz.append(step1_df.iloc[:,i].max())
                v_neg.append(step1_df.iloc[:,i].min())
            kontrol=0
        s_poz=[]
        s_neg=[]
        p_score=[]
        p_score2=[]
        result=0
        toplam=0
        for i in range(x1):
            for j in range(x2):
                result=(step1_df.iloc[i,j]-v_poz[j])**2+result
                toplam=(step1_df.iloc[i,j]-v_neg[j])**2+toplam
            s_poz.append(result**0.5)
            s_neg.append(toplam**0.5)
        for i in range(x1):
            p_score.append(s_neg[i]/(s_neg[i]+s_poz[i]))
            p_score2.append(s_neg[i]/(s_neg[i]+s_poz[i]))
        rank=[]
        p_score2.sort(reverse = True)

        for i in range(x1):
            for j in range(x1):
                if p_score[i]==p_score2[j]:
                    rank.append(j+1)
        rank=pd.DataFrame(rank)
        p_score=pd.DataFrame(p_score)
        Pd_df=pd.concat([rank,p_score],axis=1)
        globals()['concat_df']=pd.concat([Pd_df,global_df],axis=1)
        print(concat_df)
        treeview_pd()
    return 


# In[5]:


def treeview_pd():
    m_tree.destroy()
    globals()['m_tree'] =Treeview(frame_mtrx, selectmode="extended")
    m_tree.place(relx=0,rely=0,relheight=1,relwidth=1)
    verscrlbar_y = Scrollbar(m_tree,
                        orient ="vertical",
                        command = m_tree.yview)
    verscrlbar_x = Scrollbar(m_tree,
                        orient ="horizontal",
                        command = m_tree.xview)
    m_tree.configure(yscrollcommand = verscrlbar_y.set,xscrollcommand=verscrlbar_x.set)
    verscrlbar_x.pack(side ='bottom', fill ='x')
    verscrlbar_y.pack(side ='right', fill ='y')
    column_df=[]
    
    column_df.append("Rank")
    column_df.append("P Score")
    for i in range(x2):
        column_df.append("x{}".format(i))
    m_tree['columns'] = column_df
    
    m_tree.column("#0", width=0, stretch="no")
    m_tree.column("Rank", anchor="w", width=80)
    m_tree.column("P Score", anchor="w", width=80)
    for i in range(x2):
        m_tree.column("x{}".format(i), anchor="w", width=80)
        
    m_tree.heading("#0", text="", anchor="w")
    m_tree.heading("Rank", text="Rank", anchor="w")
    m_tree.heading("P Score", text="P Score", anchor="w")
    for i in range(x2):   
        m_tree.heading("x{}".format(i), text="x{}".format(i+1), anchor="w")
        
    list_df=[]
    for i in range(x1):
        for j in range(x2+2):
            list_df.append(concat_df.iloc[i,j])
        m_tree.insert('', tk.END,values=list_df)
        list_df=[]
    return


# In[6]:


def Mbutton():
    globals()['ops']=0
    if satırS.get()!="" and sütunS.get()!="":
        globals()['ops']=1
        globals()["x1"] = satırS.get()
        globals()["x1"]=int(x1)
        globals()["x2"] = sütunS.get()
        globals()["x2"]=int(x2)
        boy2=(100/x2)/100
        boy1=(100/x1)/100
        
    else:
        messagebox.showwarning("showwarning", "satır veya stünu yanlış girdiniz")
    if globals()['ops']==1:
        if x1<1 or x2<1:
            messagebox.showwarning("showwarning", "satır veya stünu yanlış girdiniz")
            ops=0
    if globals()['ops']==1 :
        globals()['hesapla']= Button(frame_altL, text ="HESAPLA", command = hesapla2)
        hesapla.place(relx=0.3,rely=0.72)
##################################################################################### 
        globals()["lbl1"]=Label(frame_altL,text="Tablo Çevirici",font=("Courier", 10))
        lbl1.place(relx=0.02,rely=0.01,relheight=0.07,relwidth=0.8)
        globals()['table_b']= Button(frame_altL, text ="Tabloya çevir", command =tablo_cevir)
        table_b.place(relx=0.2,rely=0.14)
        globals()['table_text']=tk.Text(frame_altL)
        table_text.place(relx=0.02,rely=0.06,relheight=0.07,relwidth=0.8)
##################################################################################### 
        globals()['tablosil']= Button(frame_ustL, text ="Tabloyu sil", command = tablo_sil)
        tablosil.place(relx=0.5,rely=0.6)     
    return 


# In[7]:


def hesap2_menu():
    globals()["menu_ckkv"]=True
    hesap_menu()


# In[8]:


def hesap_menu():
    window.geometry("1000x500")
    window.configure(bg='blue')
    menu_frame.destroy()
    globals()['mainframe']=Frame(window)
    mainframe.pack(side = "top", fill="both", expand=True)
    globals()["frame_ustL"]=Frame(window)
    frame_ustL.place(relx=0.0,rely=0.0,relheight=0.2,relwidth=0.2)

    globals()["satırSayısı"]=Label(frame_ustL,text="Satır Sayısı",font=("Courier", 10))
    satırSayısı.place(relx=0.02,rely=0.3,relheight=0.2,relwidth=0.5)
    globals()["sütunSayısı"]=Label(frame_ustL,text="Sütun Sayısı",font=("Courier", 10))
    sütunSayısı.place(relx=0.02,rely=0.05,relheight=0.2,relwidth=0.5)

    globals()["satırS"]=Entry(frame_ustL)
    satırS.place(relx=0.6,rely=0.3,relheight=0.2,relwidth=0.3)
    x1 = satırS.get()

    globals()["sütunS"]=Entry(frame_ustL)
    sütunS.place(relx=0.6,rely=0.05,relheight=0.2,relwidth=0.3)
    x2 = sütunS.get()

    globals()["oluştur"]= Button(frame_ustL, text ="Oluştur", command = Mbutton)
    oluştur.place(relx=0.02,rely=0.6)

#######################################################################################
    globals()["frame_altL"]=Frame(window)
    frame_altL.place(relx=0.00,rely=0.2,relheight=0.9,relwidth=0.2)

    globals()["frame_mtrx"]=Frame(window)
    frame_mtrx.place(relx=0.225,rely=0.15,relheight=0.8,relwidth=0.76)
    
    globals()["frame_cvpmtrx"]=Frame(window)
    frame_cvpmtrx.place(relx=0.225,rely=0,relheight=0.15,relwidth=0.76)
    
    globals()["anamenu"]= Button(frame_altL, text ="Ana Menu", command = main_menu)
    anamenu.place(relx=0.3,rely=0.8)
    


# In[9]:


def main_menu():
    for i in window.winfo_children():
        i.destroy()
    window.geometry("500x250")
    
    globals()['menu_frame']=Frame(window)
    menu_frame.pack(side = "top", fill="both", expand=True)
    crit_b= Button(menu_frame, text ="Crit Hesaplama", command = hesap_menu)
    crit_b.place(relx=0.02,rely=0.13)
    topsis_b= Button(menu_frame, text ="Topsis hesapla", command = hesap2_menu)
    topsis_b.place(relx=0.52,rely=0.13)
    
    globals()["menu_ckkv"]=False
    
    agir_l=Label(menu_frame,text="Ağırlıklandırma",font=("Courier", 16))
    agir_l.place(relx=0.02,rely=0.02)
    hesap_l=Label(menu_frame,text="Hesaplama Yöntemleri",font=("Courier", 16))
    hesap_l.place(relx=0.52,rely=0.02)


# In[10]:


import tkinter as tk
from  tkinter import ttk
from tkinter import messagebox
from tkinter.ttk import *

window = tk.Tk()
window.title("Test")
window.geometry("1000x500")

style = ttk.Style()
style.theme_use('clam')
globals()["crit_on"]=False

main_menu()
window.mainloop()


# In[ ]:




